import { recoverCodesModel } from '../dao/factory.js';
import { UserModel } from '../dao/mongo/models/users.model.js';
import { entorno } from '../config.js';
import crypto from 'crypto';
import { sendEmailTransport } from '../Utils/messaging.js';
import { logger } from '../Utils/logger.js';
import { createHash } from '../Utils/validations.js';

class RecoverService {
  async createCodeFromEmail(email) {
    try {
      //create code
      const code = crypto.randomBytes(32).toString('hex');
      //save code in model
      const storedCode = await recoverCodesModel.storeCode(email, code);
      //send email with link to reset password with the proper code
      const result = await sendEmailTransport.sendMail({
        from: entorno.GOOGLE_EMAIL,
        to: email,
        subject: 'Recuperar tu Password',
        html: `<div>
                    <a href="${entorno.API_URL}/api/recovers/recover-pass?code=${code}&email=${email}">Código para recuperar tu contraseña</a>
                  </div>`,
      });
      logger.debug(
        `code: ${code} + email: ${email} + storedCode ${storedCode}`
      );
      return 'ok';
    } catch (e) {
      throw e;
    }
  }

  async recoverPass(email, code) {
    try {
      const foundRecoverCode = await recoverCodesModel.foundCode(email, code);
      logger.debug(`foundRecoverCode: ${foundRecoverCode}`);
      logger.debug(`foundRecoverCode.expire: ${foundRecoverCode.expire}`);
      logger.debug(`Date.now(): ${Date.now()}`);
      if (Date.now() < foundRecoverCode.expire) {
        const rta = { view: 'recover-pass', msg: '', email, code };
        logger.debug(`rta en service: ${JSON.stringify(rta)}`);
        return rta;
      } else {
        const rta = {
          view: 'error-page',
          msg: 'Se venció el tiempo del code enviado',
          email,
          code,
        };
        return rta;
      }
    } catch (e) {
      throw e;
    }
  }

  async saveNewPass(email, code, password) {
    try {
      const foundRecoverCode = await recoverCodesModel.foundCode(email, code);
      logger.debug(`foundRecoverCode: ${foundRecoverCode}`);
      logger.debug(`foundRecoverCode.expire: ${foundRecoverCode.expire}`);
      logger.debug(`Date.now(): ${Date.now()}`);
      if (Date.now() < foundRecoverCode.expire) {
        //hash del pass
        const hashedPassword = createHash(password);
        logger.debug(`hashedPassword: ${hashedPassword}`);
        //guardar en la bbdd el pass hasheado
        let userPswUpdated = await UserModel.updateOne(
          { email },
          { password: hashedPassword }
        );
        //enviar al usuario al login
        logger.debug(`userPswUpdated: ${JSON.stringify(userPswUpdated)}`);
        const rta = {
          view: 'login-form',
          msg: '',
          email: '',
        };
        return rta;
      } else {
        const rta = {
          view: 'error-page',
          msg: 'Se venció el tiempo del code enviado',
          email: '',
        };
        return rta;
      }
    } catch (e) {
      throw e;
    }
  }
}

export const recoverService = new RecoverService();
