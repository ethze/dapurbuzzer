import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

// tipe data buat update
interface InfluencerUpdate {
    name?: string;
    ig_username?: string;
    ig_followers?: number;
    image?: string;
}

// UPDATE influencer
export async function PUT(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const ig_username = formData.get("ig_username") as string;
    const ig_followers = Number(formData.get("ig_followers") ?? 0);
    const file = formData.get("file") as File | null;

    const updateData: InfluencerUpdate = {
        name,
        ig_username,
        ig_followers,
    };


    if (file) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const fileName = `${Date.now()}-${file.name}`;

        const { data: upload, error: uploadError } = await supabase.storage
            .from("influencer") // ganti sesuai bucket lu
            .upload(fileName, buffer, {
                contentType: file.type,
                upsert: true,
            });

        if (uploadError) {
            return NextResponse.json({ error: uploadError.message }, { status: 500 });
        }

        const { data: publicUrl } = supabase.storage
            .from("influencer")
            .getPublicUrl(upload.path);

        updateData.image = publicUrl.publicUrl;
    }

    const { data, error } = await supabase
        .from("influencers")
        .update(updateData)
        .eq("id", id)
        .select()
        .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
}

