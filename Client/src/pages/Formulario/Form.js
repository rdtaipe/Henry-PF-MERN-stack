import React, { useState } from "react";
import { useForm } from "react-hook-form";
import './Form.css'
import  utils from '../../utils/arrays_dates.json'
import Header from "../../components/Header";
const Form = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

   let form1=useForm();
  // console.log(form1)



     const handleSelector=(e)=>{
        const {name,value}=e.target;
        //console.log(value)
     }
 

    const onSubmit = (e) => {
      
       console.log(e)
    }


    return (
        /*  <div className=" dark:bg-purple-900 dark:text-gray-100 min-h-screen flex flex-col justify-center items-center">
            <h2 className="text-5xl font-bold leading-none sm:text-6xl">Form</h2> */
      <div>
      {/*        <Header/> */}
             <div className="container-form">
       
              <form className=" container-card"onSubmit={handleSubmit(onSubmit)}>
                       <h2 className="title">Form Product</h2>
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


               {/*    
               
               no borrar 
               <div>
                        <input
                            className="inputStyleImage"
                            name="image"
                            id="image"
                            type="file"
                         accept=".png, .jpg ," 
                            {...register('image', {
                                required: true
                            })}
                        />
                        {errors.image?.type === 'required' && <p className="error" >Image required</p>} 

                   </div> */}


                   <div>
                        <input
                            className="inputStyleImage"
                            name="image"
                            id="image"
                            placeholder="ingrese url de imagen"
                            type="url"
                            {...register('image', {
                                required: true
                            })}
                        />
                        {errors.image?.type === 'required' && <p className="error" >url required</p>} 

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
                            maxLength: 400
                        })} />
                        {errors.description?.type === 'required' && <p className="error">Description required</p>}
                        {errors.description?.type === 'maxLength' && <p className="error">Only can use 400 letters</p>}
                    </div>



                    <div className="container2">
                        <div>
                            <label>stock</label>
                            <input
                                className="input2"
                                type="text"
                                name="stock"
                                placeholder="0"
                             /*    min="0"
                                 step="0" */
                              /*   autocomplete="off" */
                                {...register('stock', {
                                    required: true,
                                    pattern: /^[0-9]*$/
                                })} />
                            {errors.stock?.type === 'required' && <p className="error">stock required</p>}
                            {errors.stock?.type === 'pattern' && <p className="error">Only numbers </p>}
                        </div>


                        
                       <div>
                            <label htmlFor="price">Price</label>
                            <input 
                               id="price"
                                className="input2"
                                type="text"
                              /*   min={0}
                                step="0.01" */
                                 placeholder="0.00"
                                name="price"
                                {...register('price', {
                                    required: true,
                                    pattern: /^[0-9]*$/
                                })} />
                          
                            {errors.price?.type === 'required' && <p className="error">price required</p>}
                            {errors.price?.type === 'pattern' && <p className="error"> Only numbers </p>}

                        </div>

                           <div>
                            <select
                                className="inputSelector"
                                id="genre"
                                name="genre"
                              
                                {...register('genre', {
                                    required: true,
                                })}
                         
                            >
                                <option value="">Select one genre</option>
                                {utils.genre.map((c) => (
                                    <option key={c.name} value={c.name}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                            {errors.genre && <p className="error">genre is required</p>}
                        </div>

                      
 

                      {/*   
                        <div className="container-sex" >
                        <input
                                type="radio"
                                id="male"
                                name="gender"
                                value="male"
                                {...register("gender", { required: true })}
                            />
                            <label htmlFor="male">Male</label>
                            <br />

                            <input
                                type="radio"
                                id="female"
                                name="gender"
                                value="female"
                                {...register("gender", { required: true })}
                            />
                            <label htmlFor="female">Female</label>
                            <br />
                        {errors.gender && <p className="error">Sex is required</p>}
                        </div> */}

                    </div>
                    
  
                 <div className="container2">
                        <div>
                            <select
                                className="inputSelector"
                                id="color"
                                name="color"
                            
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
                        <button className="botonStyle"  type="submit">Add Product</button>
                     </div>
                </form>
            </div>
      </div>
    );
};

export default Form;