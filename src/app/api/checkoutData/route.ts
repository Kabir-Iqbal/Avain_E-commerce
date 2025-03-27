import { NextResponse , NextRequest } from "next/server";

const CheckOutData : any[] = [
   
]


export  function GET() {    
    console.log("data in server", CheckOutData);
    
    return NextResponse.json(CheckOutData)
}

export async function POST( request : NextRequest) {
    const body = await request.json() //in
    console.log("data in post ", body)

    // چیک کریں کہ آیا body پہلے سے موجود ہے یا نہیں
    const isAlreadyInCheckout = CheckOutData.some((item)=> JSON.stringify(item)=== JSON.stringify(body))
    if (!isAlreadyInCheckout) {
        CheckOutData.push(body);
    
    }

    return NextResponse.json(CheckOutData) // out
}