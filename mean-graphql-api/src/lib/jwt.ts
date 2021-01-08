import { IJWT } from './../interfaces/jwt.interface';
import { SECRET_KEY, MESSAGES, EXPIRETIME } from './../config/constants';
import jwt from 'jsonwebtoken';

class JWT {
    private secretKey = SECRET_KEY as string;

    sign(data : IJWT, expiresIn : number = EXPIRETIME.DAY){
        var newToken = jwt.sign(
            {user: data.user},
            this.secretKey,
            {expiresIn} //24 hours
            )
        
        return newToken
    }

    verify(token: string){
        try {
            var result = jwt.verify(token, this.secretKey)
            return result as string;
        }catch (error) {
            return MESSAGES.TOKEN_VERIFICATION_FAILED
        }
    }
}

export default JWT;