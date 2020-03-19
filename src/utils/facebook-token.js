const _ = require('lodash');
const md5 = require('md5');
const axios = require('axios');
const uuid = require('uuid/v4');
const queryString = require('query-string');

const random = _.random;

function randomString(length = 10) {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';

  return (
    _.sample(chars.slice(0, chars.indexOf('z') + 1)) +
    _.sampleSize(chars, length - 1).join('')
  );
}

function sortObjectKeys(obj) {
  return Object.keys(obj)
    .sort()
    .reduce((result, key) => {
      result[key] = obj[key];

      return result;
    }, {});
}

function generateSignature(formData) {
  let data = sortObjectKeys(formData);

  data = queryString
    .stringify(data, { encode: false })
    .split('&')
    .join('');
  data += `62f8ce9f74b12f84c123cc23437a4a32`;

  return md5(data);
}

function generateSignature2(formData) {
  let data = sortObjectKeys(formData);

  data = queryString
    .stringify(data, { encode: false })
    .split('&')
    .join('');
  data += `c1e620fa708a1d5696fb991c1bde5662`;

  return md5(data);
}

export async function getFacebookAccessToken(email, password) {
  try {
    const adID = uuid();
    const deviceID = uuid();

    const formData = {
      adid: adID,
      format: 'json',
      device_id: deviceID,
      email,
      password,
      cpl: 'true',
      family_device_id: deviceID,
      credentials_type: 'device_based_login_password',
      generate_session_cookies: '1',
      error_detail_type: 'button_with_disabled',
      source: 'device_based_login',
      machine_id: randomString(24),
      meta_inf_fbmeta: '',
      advertiser_id: adID,
      currently_logged_in_userid: '0',
      locale: 'vi_VN',
      client_country_code: 'VN',
      method: 'auth.login',
      fb_api_req_friendly_name: 'authenticate',
      fb_api_caller_class:
        'com.facebook.account.login.protocol.Fb4aAuthHandler',
      api_key: '882a8490361da98702bf97a021ddc14d'
    };

    formData.sig = generateSignature(formData);

    const sim = random(2e4, 4e4);
    const bandwidth = random(2e7, 3e7);

    let options = {
      url: 'https://b-api.facebook.com/method/auth.login',
      method: 'post',
      data: queryString.stringify(formData),
      headers: {
        'x-fb-connection-bandwidth': bandwidth,
        'x-fb-sim-hni': sim,
        'x-fb-net-hni': sim,
        'x-fb-connection-quality': 'EXCELLENT',
        'x-fb-connection-type': 'cell.CTRadioAccessTechnologyHSDPA',
        'user-agent':
          'Dalvik/1.6.0 (Linux; U; Android 4.4.2; NX55 Build/KOT5506) [FBAN/FB4A;FBAV/106.0.0.26.68;FBBV/45904160;FBDM/{density=3.0,width=1080,height=1920};FBLC/it_IT;FBRV/45904160;FBCR/PosteMobile;FBMF/asus;FBBD/asus;FBPN/com.facebook.katana;FBDV/ASUS_Z00AD;FBSV/5.0;FBOP/1;FBCA/x86:armeabi-v7a;]',
        'content-type': 'application/x-www-form-urlencoded',
        'x-fb-http-engine': 'Liger',
        'Access-Control-Allow-Origin': '*'
      }
    };

    const response = await axios(options);

    const { data } = response;

    if (data.error_code) {
      const error = Error(data.error_msg);
      error.code = data.error_code;
      error.data = data.error_data ? JSON.parse(data.error_data) : undefined;

      throw error;
    }

    return data;
  } catch (err) {
    console.log(err);

    let error = Error('Internal server error.');
    error.code = 500;

    if (err.code) {
      error = err;
    }

    throw error;
  }
}

export function getFacebookAccessTokenURL(email, password) {
  const query = {
    api_key: `3e7c78e35a76a9299309885393b02d97`,
    email,
    format: `JSON`,
    locale: `vi_vn`,
    method: `auth.login`,
    password,
    return_ssl_resources: 0,
    v: `1.0`
  };

  query.sig = generateSignature2(query);

  return `https://api.facebook.com/restserver.php?${queryString.stringify(
    query
  )}`;
}
