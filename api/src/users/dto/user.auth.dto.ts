import { IsEmail, IsString, MinLength } from "class-validator"

export class UserAuthDto{
    name: string

    @IsEmail()
    email: string


    @IsString()
    @MinLength(6, {
        message: 'Пароль не может быть короче 6-ти символов!'
    })
    password: string

}