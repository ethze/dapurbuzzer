import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

// GET all influencers
export async function GET() {
  const { data, error } = await supabase.from("influencers").select("*");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// POST new influencer
export async function POST(req: Request) {
  const body = await req.json();

  const { data, error } = await supabase
    .from("influencers")
    .insert([body])
    .select();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data[0]);
}

