import {NextResponse} from "next/server";
import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import prisma from "../../../../lib/prisma";
import path from "path"
import {writeFile} from "fs/promises";

export const POST = async (request: Request) => {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });
        if (!session || !session.user) {
            return NextResponse.json({error: "Unauthorized"}, {status: 401});
        }

        const formData = await request.formData();

        const name = formData.get("name") as string;
        const description = formData.get("description") as string;
        const image = formData.get("image") as File;
        const githubUrl = formData.get("githubUrl") as string;
        const demoUrl = formData.get("demoUrl") as string;
        const tags = formData.get("tags") as string; // JSON string

        const tagsId = JSON.parse(tags)

        if (!name || !description) {
            return NextResponse.json({error: "Missing parameters"}, {status: 400});
        }

        const bytes = await image.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const imageUrl = `/images/${new Date().getTime()}_${image.name}`;
        const imagePath = path.join(process.cwd(), `/public${imageUrl}`);
        await writeFile(imagePath, buffer);

        const project = await prisma.project.create({
            data: {
                name: name,
                description: description,
                image: imageUrl,
                githubUrl: githubUrl || null,
                demoUrl: demoUrl || null,
                tags: {
                    connect: tagsId.map((id: number) => ({id})),
                }
            },
            include: {
                tags: true,
            }
        })

        return NextResponse.json(project);
    } catch (error) {
        return NextResponse.json({error: String(error)}, {status: 500});
    }
};

export const GET = async () => {
    try {

        const projects = await prisma.project.findMany({
            include: {
                tags: true,
            }
        });

        return NextResponse.json(projects);

    } catch (error) {
        return NextResponse.json({error: String(error)}, {status: 500});
    }
}

export const PUT = async (res: Request) => {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });
        if (!session || !session.user) {
            return NextResponse.json({error: "Unauthorized"}, {status: 401});
        }

        const body = await res.json();
        const {id, name, description, image, githubUrl, demoUrl} = body;

        console.log("body", body)
        if (!id || !name || !description) {
            return NextResponse.json({error: "Missing parameters"}, {status: 400});
        }

        const project = await prisma.project.update({
            where: {id: Number(id)},
            data: {
                name,
                description,
                image,
                githubUrl: githubUrl || null,
                demoUrl: demoUrl || null,
            },
            include: {
                tags: true,
            }
        });

        return NextResponse.json(project);
    }catch (error) {
        return NextResponse.json({error: String(error)}, {status: 500});
    }
}

export const DELETE = async (req: Request) => {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });
        if (!session || !session.user) {
            return NextResponse.json({error: "Unauthorized"}, {status: 401});
        }

        const body = await req.json();
        const {id} = body;

        if (!id) {
            return NextResponse.json({error: "Missing parameters"}, {status: 400});
        }

        await prisma.project.delete({
            where: {id: Number(id)},
        });

        return NextResponse.json({id});
    } catch (error) {
        return NextResponse.json({error: String(error)}, {status: 500});
    }
}
