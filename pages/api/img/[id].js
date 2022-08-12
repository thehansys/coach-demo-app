import * as path from "path"
import * as fileSystem from "fs"

export default function handler(req, res) {
    try{
        let imgCount = 8;
        let id = (parseInt(req.query.id) % imgCount) + 1;
        let file = path.join(process.cwd(), `public/img/${id}.jpg`);
        let stat = fileSystem.statSync(file);
        res.status(200);
        res.writeHead(200, {
            'Content-Type': 'image/jpeg',
            'Content-Length': stat.size
        });
        let readStream = fileSystem.createReadStream(file);
        readStream.pipe(res);
    }catch{
        res.status(404).json({})
    }
}