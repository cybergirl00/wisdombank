"use client"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { useToast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { db, storage } from "@/lib/firebase"
import { addDoc, collection,  } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { RotateCcw } from 'lucide-react'
import { useState } from "react"
import ImageUploader from "@/components/ImageUploader"
const UploadForm = () => {
    const { toast } = useToast()
    const [files, setFiles] = useState([])
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const formSchema = z.object({
        book: z.string(),
        program: z.string(),
        name: z.string(),
        code: z.string(),
        lecturer: z.string(),
        year: z.string()
      })
        // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
     book: "",
      program: "",
      name: "",
      code: "",
      lecturer: "",
      year: ""
    },
  })
 
  // 2. Define a submit handler.
 async function onSubmit(values) {
    setLoading(true)
    await addDoc(collection(db, values.program), {
        name: values.name,
        code: values.code,
        book: values.book,
        lecturer: values.lecturer,
        year: values.year
    }).then(() => {
        toast({
            title: "Congratulations!",
            description: `Past Question Uploaded for ${values.name}`,
          })
        setLoading(false)
        router.push('/')
    })
    console.log(values)
  }
      
  return (
    <div className="p-3">
         <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 p-2">
        <div className="">
      <div className="flex flex-col gap-5 md:flex-row">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Course title</FormLabel>
              <FormControl>
                <Input placeholder="Enter your corse title" {...field} 
                className='bg-gray-50 h-[54px] focus-visible:ring-offset-0 placeholder:text-gray-500 rounded-full p-regular-16 px-4 py-3 border-none focus-visible:ring-transparent !important'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Course Code</FormLabel>
              <FormControl>
                <Input placeholder="Enter your course code" {...field} 
                className='bg-gray-50 h-[54px] focus-visible:ring-offset-0 placeholder:text-gray-500 rounded-full p-regular-16 px-4 py-3 border-none focus-visible:ring-transparent !important'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
        <FormField
          control={form.control}
          name="lecturer"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Lecturer Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter Lecture name" {...field} 
                className='bg-gray-50 h-[54px] focus-visible:ring-offset-0 placeholder:text-gray-500 rounded-full p-regular-16 px-4 py-3 border-none focus-visible:ring-transparent !important'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Session</FormLabel>
              <FormControl>
                <Input placeholder="eg 2023/2024" {...field} 
                className='bg-gray-50 h-[54px] focus-visible:ring-offset-0 placeholder:text-gray-500 rounded-full p-regular-16 px-4 py-3 border-none focus-visible:ring-transparent !important'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
        <FormField
          control={form.control}
          name="program"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Program</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger  className='bg-gray-50 h-[54px] focus-visible:ring-offset-0 placeholder:text-gray-500 rounded-full p-regular-16 px-4 py-3 border-none focus-visible:ring-transparent !important'>
                    <SelectValue placeholder="Select the program for this course." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="cyber security">Cyber Security</SelectItem>
                  <SelectItem value="computer science">Computer Science</SelectItem>
                  <SelectItem value="software engineering">Software Engineering</SelectItem>
                  <SelectItem value="information system">Information System</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
    
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
          control={form.control}
          name="book"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Study Material</FormLabel>
              <FormControl>
                <ImageUploader 
                             imageUrl={field.value}
                             setFiles={setFiles}               
                             onFieldChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        </div>
        {/* <Button type="submit">Submit</Button> */}
        {loading === true ? 
       <Button disabled
       >
        <RotateCcw className="mr-2 h-4 w-4 animate-spin"/>
        Submiting...
       </Button>
       : 
       <Button
       >
        Submit
       </Button>
       }
        </form>
        </Form>
    </div>
  )
}

export default UploadForm