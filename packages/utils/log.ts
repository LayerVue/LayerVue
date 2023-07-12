// import { version } from '../../package.json';
import { once } from 'lodash-es';
const logVersion = once(() => {
  console.log(
    `%c layer-vue %c v${3} %c`,
    'background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
    'background:#41b883 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
    'background:transparent'
  );
});

export { logVersion };
