'use client'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from "./ui/button"
import { useEffect, useLayoutEffect, useState } from "react"
import Spinner from "./Spinner"
const BookContainer = ({user,books}) => {
  const [downloadFile, setDownloadFile] = useState();
  const [fileName, setFileName] = useState('');

  const handleDownload = (book) => {
    const a = document.createElement('a')
    a.href = book
    a.download = book
    a.click();
  }

  if(!books) <Spinner message={'Please wait...'}/>

  return (
    <div className='p-5'>
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:grid-cols-2">
            {books.length>0 && books.map((book) => (
                <Card>
                <CardContent>
                  <div className="">
                    <div className="p-5 ">
                    <div className="w-full  text-sm text-primary h-[100px] bg-secondary rounded-lg flex flex-col items-center justify-center">{book?.code}</div>
                    </div>
                    <h2 className='font-bold text-1xl line-clamp-1'>{book?.name}</h2>
                    <h2 className="text-semibold text-lg">{book?.lecturer}</h2>
                    <h2 className="text-primary">{book?.year}</h2>
                  </div>
                </CardContent>
                <CardFooter className='flex gap-2 w-full'>
                
                 <Button className='w-full'
                 onClick={() => handleDownload(book?.book)}
                 >Read now</Button>
                </CardFooter>
              </Card>
              
            ))}
        </div>
    </div>
  )
}

export default BookContainer