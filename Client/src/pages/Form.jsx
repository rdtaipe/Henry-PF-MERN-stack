import React from "react";
import {useForm}from "react-hook-form";
import Header from "../components/Header";

const Form = () => {
  const { register, handleSubmit, formState:{errors} } = useForm();
  const onSubmit = (data)=> {
   console.log(data) 
  }
  return (
    <div>
<Header/>
    <div className=" dark:bg-purple-900 dark:text-gray-100 min-h-screen flex flex-col justify-center items-center">
      <h2 className="text-5xl font-bold leading-none sm:text-6xl">Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="">Product Name</label>
          <input type="text" {...register('name', {
            required: true,
            maxLength: 20
          })} />
          {errors.name?.type ==='required' && <p>Name required</p>}
          {errors.name?.type ==='maxLength' && <p>Only can use 20 letters</p>}
        </div>
        <div>
          <label className="">Fashion label</label>
          <input type="text" {...register('label', {
            required: true,
            maxLength: 20
          })} />
          {errors.label?.type ==='required' && <p>Name required</p>}
          {errors.label?.type ==='maxLength' && <p>Only can use 20 letters</p>}
        </div>
        <div>
          <label className="">Price</label>
          <input type="text" {...register('price', {
            required: true,
          })}/>
          {errors.price?.type ==='required' && <p>Name required</p>}
          {errors.price?.type ==='maxLength' && <p>Only can use 20 letters</p>}
        </div>
        <div>
          <label className="">Category</label>
          <select {...register('category', {
            required: true,
          })}>
            {errors.category?.type ==='maxLength' && <p>Select a category</p>}
            <option>Shirts</option>
            <option>Trousers</option>
            <option>Dresses</option>
            <option>Shoes</option>
          </select>
        </div>
        <input type="submit" value="Create" className="" />
      </form>
    </div>
    </div>
    
  );
};

export default Form;