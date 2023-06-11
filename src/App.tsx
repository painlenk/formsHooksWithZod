import {useForm} from 'react-hook-form'
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import { useState } from 'react'



const userLoginSchema = z.object({
  email: z.string().nonempty('..ops!! acho que você esqueceu do email').email('insira um e-mail válido'),
  password: z.string().nonempty('..ops!! acho que você esqueceu da senha').min(6, 'minimo de 6 digitos')
})

type UserLogin = z.infer<typeof userLoginSchema>


function App() {
  const [outPut, setOutput] = useState('')
  const { formState: {errors}, register, handleSubmit} = useForm<UserLogin>({resolver: zodResolver(userLoginSchema)})

  const handleUserLogin = (data : UserLogin) => {
    setOutput(JSON.stringify(data, null, 2))
  }


  return(
    <main className="w-full h-screen flex flex-col items-center justify-center bg-stone-900">
    <form  
      onSubmit={handleSubmit(handleUserLogin)} 
      className="w-1/3 flex flex-col bg-stone-700 gap-4 p-4 rounded text-white items-center justify-center">

      <div className="flex flex-col w-full gap-1">
        <label htmlFor="email">E-mail</label>
        <input 
          type="text" 
          id="email"
          className=" h-10 rounded bg-stone-900 p-4"
          {...register('email')}
        />
 
        {errors?.email && (
          <span className='text-red-600'>{errors?.email?.message}</span>
        )}
      </div>

      <div className="flex flex-col w-full gap-1">
        <label htmlFor="password">Password</label>
        <input 
          type="password" 
          id="password" 
          className=" h-10 rounded bg-stone-900 p-4"
          {...register('password')}
        />
        {errors?.password && (
          <span className='text-red-600'>{errors?.password?.message}</span>
        )}
      </div>

      <input type="submit" className=" w-1/2 bg-green-700 h-10 rounded font-bold hover:bg-green-400"/>
    </form>

    <div className='text-white'>
      {outPut}
    </div>

  </main>
  )
}

export default App;
