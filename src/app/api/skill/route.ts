import {NextResponse} from "next/server";
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
        const {text, icon} = body

        if (!text) {
            return NextResponse.json({
                error: "Missing parameters",
            }, {status: 400})
        }
        const skill = await prisma.skill.create({
            data: {
                icon,
                text,
            }
        })

        return NextResponse.json(skill)


    } catch (error) {
        return NextResponse.json({
            error: error,
        })
    }
}

export const GET = async () => {
    try {
        const skills = await prisma.skill.findMany()

        return NextResponse.json(skills)
    } catch (error) {
        return NextResponse.json({
            error: error,
        })
    }
}

export const PUT = async (req: Request) => {
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
        const {id, text, icon} = body

        if (!id || !text) {
            return NextResponse.json({
                error: "Missing parameters",
            }, {status: 400})
        }

        const skill = await prisma.skill.findUnique({
            where: {
                id: Number(id),
            }
        })
        if (!skill) {
            return NextResponse.json({
                error: "Skill not found",
            })
        }
        const updatedSkill = await prisma.skill.update({
            where: {id: Number(id)},
            data: {
                text,
                icon,
            }
        })

        return NextResponse.json(updatedSkill)

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

        const skill = await prisma.skill.findUnique({
            where: {
                id: Number(id),
            }
        })
        if (!skill) {
            return NextResponse.json({
                error: "Skill not found",
            }, {status: 404})
        }

        await prisma.skill.delete({
            where: {id: Number(id)},
        })

        return NextResponse.json({message: "Skill deleted", id: id})


    } catch (error) {
        return NextResponse.json({
            error: error,
        })
    }
}