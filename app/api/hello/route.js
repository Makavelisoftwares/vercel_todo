import { NextResponse } from "next/server";
import fs from "fs"
import { join } from "path";
import {PrismaClient} from '@prisma/client'

const prisma=new PrismaClient();

export async function GET(){
    try {
        const taskItems=await prisma.task.findMany();
        return NextResponse.json(taskItems,{status:200})
    } catch (error) {
        console.log(error)
    }
}

export async function POST(request){
    // return NextResponse.json('hello')

    const data=await request.formData();
    const taskimg= data.get('taskimg');
    const taskname= data.get('taskname');


    const buffer=Buffer.from(await taskimg.arrayBuffer());
    const path=join('public/Images',`${Date.now()}_${taskimg.name}`)

    const pathname=`${path.split('\\')[1]}/${path.split('\\')[2]}`
    fs.writeFile(path,buffer,(err)=>{
        if(err){
            console.log(err)
        }else{
            console.log('created')
        }
    })

    try {
        const taskItem=await prisma.task.create({
            data:{
                taskimg:pathname,
                taskname:taskname
            }
        })


        return NextResponse.json(taskItem,{status:200})
    } catch (error) {
        console.log(error)
    }


}