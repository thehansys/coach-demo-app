
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export default function handler(req, res) {
    const titles = [
        "Made To Order Women’s Sneaker",
        "Studio Shoulder Bag With Quilting",
        "Gotham Tall Tote In Signature Leather",
        "Alana Tote In Signature Canvas",
        "QA_AUTO Charter Backpack 18 In Colorblock",
        "QA_AUTO Charter Backpack 18 In Colorblo",
        "Soft Tabby Hobo In Signature Jacquard",
        "Soft Tabby Hobo"
    ];
    try{
        let id = parseInt(req.query.id);
        res.status(200).json({
            data : {
                id : id,
                title : titles[id % titles.length],
                price : randomIntFromInterval(1,500),
                img : `/api/img/${id}`
            }
        })
    }catch{
        res.status(404).json({
            data : null
        })
    }
}