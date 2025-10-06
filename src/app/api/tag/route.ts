import {NextResponse} from "next/server";
import {useSession} from "@/lib/auth-client";
import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import prisma from "../../../../lib/prisma";


export const POST = async (req: Request) => {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        })

        if (!session || !session.user) {
            return NextResponse.json({
                error: "Unauthorized",
            }, {status: 401})
        }

        const body = await req.json()
        console.log(body)
        const {label, color, icon} = body

        if (!label || !color || !icon) {
            return NextResponse.json({
                error: "Missing parameters",
            }, {status: 400})
        }
        const tag = await prisma.tag.create({
            data: {
                icon,
                label,
                color,
            }
        })

        return NextResponse.json(tag)



    } catch (error) {
        return NextResponse.json({
            error: error,
        })
    }
}

export const GET = async (req: Request) => {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        })

        if (!session || !session.user) {
            return NextResponse.json({
                error: "Unauthorized",
            }, {status: 401})
        }
        const tags = await prisma.tag.findMany()

        return NextResponse.json(tags)
    } catch (error) {
        return NextResponse.json({
            error: error,
        })
    }
}

export const DELETE = async (req: Request) => {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        })

        if (!session || !session.user) {
            return NextResponse.json({
                error: "Unauthorized",
            }, {status: 401})
        }
        const body = await req.json()
        const {id} = body

        const tag = await prisma.tag.findUnique({
            where: {
                id: Number(id),
            }
        })
        if (!tag) {
            return NextResponse.json({
                error: "Tag not found",
            }, {status: 404})
        }

        await prisma.tag.delete({
            where: {id: Number(id)},
        })

        return NextResponse.json({message: "Tag deleted", id: id})


    } catch (error) {
        return NextResponse.json({
            error: error,
        })
    }
}