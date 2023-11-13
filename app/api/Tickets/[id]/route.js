import { Ticket } from "@/app/(models)/Ticket";
import { mongooseConnect } from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    await mongooseConnect();
    const { id } = params;
    await Ticket.findByIdAndDelete(id);

    return NextResponse.json({ message: "Ticket Deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function GET(req, { params }) {
  try {
    await mongooseConnect();
    const { id } = params;
    const foundTicket = await Ticket.findOne({ _id: id });

    return NextResponse.json({ foundTicket }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await mongooseConnect();
    const { id } = params;
    const body = await req.json();
    console.log(body);
    const ticketData = body.formData;
    const updateTicketData = await Ticket.findByIdAndUpdate(id, {
      ...ticketData,
    });
    return NextResponse.json({ message: "Ticket Updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
