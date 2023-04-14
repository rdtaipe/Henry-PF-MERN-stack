import React, { useState } from "react";
import { useForm } from "react-hook-form";
import './Form.css'
import  utils from './utils.json'

const Form = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [input,setInput]=useState(
        {
        name:"",
        gender:{F:"female",M:"male"},
        color:'',
        cotegories:''
        }
    )

     const handleSelector=(e)=>{
        const {name,value}=e.target;
        console.log(value)
     }

    const handleGenderChange=(e)=>{
     const {name,value}=e.target;

        const isGenderSelected = input.gender !== undefined && input.gender !== '';
       if(isGenderSelected)
       {
           console.log(value)
       }
     
    }

    const onSubmit = (e) => {
       e.preventDefault();
    }
    return (
       /*  <div className=" dark:bg-purple-900 dark:text-gray-100 min-h-screen flex flex-col justify-center items-center">
            <h2 className="text-5xl font-bold leading-none sm:text-6xl">Form</h2> */

            <div className="container">
                <h2 className="title">Form Product</h2>


                <form className=" container-card"onSubmit={handleSubmit(onSubmit)}>
                    <div>
                      <input 
                       className="inputStyle"
                       type="text" 
                        name="name"
                        placeholder="Name of product" 
                      
                        {...register('name', {
                            required: true,
                            maxLength: 35
                        })} />
                        {errors.name?.type === 'required' && <p className="error">Name required</p>}
                        {errors.name?.type === 'maxLength' && <p className="error">Only can use 35 letters</p>}
                    </div>


                   <div>
                        <input
                            className="inputStyleImage"
                            name="image"
                            id="image"
                            type="file"
                            /*   accept=".png, .jpg" */
                            {...register('image', {
                                required: true
                            })}
                        />
                        {errors.image?.type === 'required' && <p className="error" >Image required</p>} 

                   </div>
                    

                   

                    <div>
                      <textarea 
                        className="inputStyleArea"
                        name="description"
                        placeholder="description of product" 
                        rows="2" cols="25"
                        style={{ resize: 'none' }}
                        {...register('description', {
                            required: true,
                            maxLength: 20
                        })} />
                        {errors.description?.type === 'required' && <p className="error">Description required</p>}
                        {errors.description?.type === 'maxLength' && <p className="error">Only can use 20 letters</p>}
                    </div>



                    <div className="container2">
                        <div>
                            <label>stock</label>
                            <input
                                className="input2"
                                type="number"
                                name="stock"
                                min="0"
                              /*   autocomplete="off" */
                                {...register('stock', {
                                    required: true,
                                    pattern: /^[0-9]*$/
                                })} />
                            {errors.stock?.type === 'required' && <p className="error">stock required</p>}
                            {errors.stock?.type === 'pattern' && <p className="error">Only can use numbers may zero</p>}
                        </div>
                        <div>
                            <label>Price</label>
                            <input 
                                className="input2"
                                type="number"
                                min={0}
                                name="price"
                                {...register('price', {
                                    required: true,
                                })} />
                           {/*  {errors.price?.type === 'required' && <p>price required</p>}
                            {errors.price?.type === 'maxLength' && <p> Only can use numbers may zeros</p>} */}
                            {errors.price?.type === 'required' && <p className="error">price required</p>}
                            {errors.price?.type === 'maxLength' && <p className="error"> Only can use numbers may zeros</p>}

                        </div>


                             {/*      <div >
                            
                            <input type="radio" id="male" name="gender" value={input.M} 
                             checked={input.gender.M === "male"} 
                                {...register('male', {
                                    required: true,
                                })}
                            onChange={handleGenderChange} />
                            <label htmlFor="male">Male</label><br />
                            <input type="radio" id="female" name="gender" value={input.M}  
                         checked={input.gender.F === "female"} 
                                {...register('female', {
                                    required: true,
                                })}
                            onChange={handleGenderChange}  />
                            <label htmlFor="female">Female</label><br />

                            {errors.gender?.type === 'required' && <p className="error">sex required</p>}
                            
                        </div> */}


                        <div className="container-sex" >
                            <input
                                type="radio"
                                id="male"
                                name="gender"
                                value={input.gender}
                                {...register("gender", { required: true })}
                                onChange={handleGenderChange}
                            />
                            <label htmlFor="male">Male</label>
                            <br />

                            <input
                                type="radio"
                                id="female"
                                name="gender"
                                value={input.gender}
                                {...register("gender", { required: true })}
                                onChange={handleGenderChange}
                            />
                            <label htmlFor="female">Female</label>
                            <br />
                           {errors.gender && <p className="error">Sex is required</p>}
                        </div>

                    </div>
                    
  
                    <div className="container2">
                        <div>
                            <select
                                className="inputSelector"
                                id="color"
                                name="color"
                                onChange={handleSelector}
                                value={input.color}
                                {...register('color', {
                                    required: true,
                                })}
                         
                            >
                                <option value="">Select one color</option>
                                {utils.colors.map((c) => (
                                    <option key={c.name} value={c.name}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                            {errors.color && <p className="error">Color is required</p>}
                        </div>

                        <div>
                           
                            <select 
                            className="inputSelector"
                             id="categories"
                            name="categories"
                            onChange={handleSelector}
                            value={input.cotegories}
                            {...register('categories',
                                {
                                    required: true,
                                })}>

                                <option value="">select one category</option>
                                {
                                    utils.categories.map(cat => (
                                        <option key={cat.name} value={cat.name}>{cat.value}</option>
                                    ))}

                            </select>
                            {errors.categories && <p className="error" >Select a category</p>} 
                        </div>

                    </div>
                  
                     <div>
                           {/*  {!input.color || !input.gender || !input.name || !input.cotegories} */}
                        <button className="botonStyle"  type="submit">Create Product</button>
                     </div>
                </form>
            </div>
 

    );
};

export default Form;