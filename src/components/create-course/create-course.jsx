import Link from "next/link";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'
import ComInput from "../ComInput/ComInput";
import ComUpImg from "../ComInput/ComUpImg";
import ComTextArea from "../ComInput/ComTextArea";
import axios from "axios";

const CourseArea = () => {
  const [image, setImages] = useState([]);

  const CreateProductMessenger = yup.object({
    courseTitle: yup.string().required("courseTitle is required item"),
    information: yup.string().required("information is required item"),
    skill: yup.string().required("skill is required item"),
    price: yup.string().required("price is required item"),
    category: yup.string().required("category is required item"),
    style: yup.string().required("style is required item"),
    description: yup.string().required("description is required item"),
  })
  const createProductRequestDefault = {

  };
  const methods = useForm({
    resolver: yupResolver(CreateProductMessenger),
    defaultValues: {
      courseTitle: '',
      information: '',
      skill: '',
      price: '',
      category: '',
      style: '',
      description: '',
    },
    values: createProductRequestDefault
  })
  const { handleSubmit, register, setFocus, watch, setValue } = methods
  const onSubmit = async (data) => {
    console.log(data);
    console.log(image);
    try {
      const response = await axios.post('https://drawproject-production.up.railway.app/api/courses', {
        data
      });
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }

  }
  const onChange = (data) => {
    const selectedImages = data;
    const newImages = selectedImages.map((file) => file.originFileObj);
    setImages(newImages);
  }
  return (
    <>
      <div style={{ padding: 10 }}>
        <FormProvider {...methods} >
          <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mt-4 max-w-xl sm:mt-8" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: "100%", padding: 50 }}>
              <div className="mx-auto max-w-2xl text-center">
                <h1>Create Course</h1>
              </div>
              <div >
                <ComInput
                  type="text"
                  label='Course Title'
                  placeholder='Please enter courseTitle'
                  {...register("courseTitle")}
                  required
                />
              </div>
              <div >
                <ComInput
                  type="text"
                  label='Information Title'
                  placeholder='Please enter information'
                  {...register("information")}
                  required
                />
              </div>
              <div >
                <ComInput
                  type="text"
                  label='Skill Title'
                  placeholder='Please enter skill'
                  {...register("skill")}
                  required
                />
              </div>
              <div >
                <ComInput
                  type="text"
                  label='Price'
                  placeholder='Please enter price'
                  {...register("price")}
                  required
                />
              </div>
              <div >
                <ComInput
                  type="text"
                  label='Category'
                  placeholder='Please enter category'
                  {...register("category")}
                  required
                />
              </div>
              <div >
                <ComInput
                  type="text"
                  label='Style'
                  placeholder='Please enter style'
                  {...register("style")}
                  required
                />
              </div>
              <div >
                <ComTextArea
                  type="text"
                  label='Description'
                  maxLength={3000}
                  placeholder='Please enter description'
                  {...register("description")}
                  required
                />
              </div>
              <div className="mt-4">
                <ComUpImg onChange={onChange} />
              </div>
            </div>
            <div className="mt-10">
              <input className="btn btn-primary" type="submit" value="Submit" />
            </div>
          </form>
        </FormProvider>

      </div>
    </>
  );
};

export default CourseArea;
