import { Request, Response, NextFunction } from "express"
import * as yup from "yup"
import { SchemaOf } from "yup"

import { ICreateUser } from "../interfaces/index"

// usamos a interface para especificar o tipo do schema
// em SchemaOf<ICreateUser>
export const userCreateSchema: SchemaOf<ICreateUser> = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
})

// a função recebe o schema como parâmetros
// para fazer a validação
export const validateUserCreate =
  (schema: SchemaOf<ICreateUser>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // acessa os dados do corpo da requisição
      const data = req.body

      // bloco try/catch para capturar erros específicos do yup
      try {
        // chamando o método validate
        const validatedData = await schema.validate(data, {
          abortEarly: false,
          // exclui as chaves que não estão no schema
          stripUnknown: true,
        })

        // adicionamos uma nova chave a requisição, com os dados validados do usuario
        req.newUser = validatedData

        next()
      } catch (err: any) {
        // caso algum erro do yup aconteca,
        // ele vai ser tratado e enviado ao usuario
        return res.status(400).json({
          error: err.errors?.join(", "),
        })
      }
    } catch (err: any) {
      return err
    }
  }
