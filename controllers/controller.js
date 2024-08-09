import prisma from "../libs/prismadb.js";

export const getSneakers = async ( req,res)=>{
    try{
        const {search,sortBy} = req.query;
        const query = search?{name:{contains:search,mode:"insensitive"}}:{};
        const orderBy = {};
        if(sortBy==='name')orderBy.name="asc";
        if(sortBy ==="asc")orderBy.price=sortBy;
        if(sortBy==="desc")orderBy.price=sortBy;
        
        const sneakers = await prisma.sneakers.findMany({
            where:query,
            orderBy:orderBy
        });
        res.json(sneakers);
    }catch(e){
        res.status(500).json({e:'Failed to fetch sneakers'});
    }
};
export const getSneakersBasket = async(req,res)=>{
    try{
        const sneakers = await prisma.sneakers.findMany({
            where:{isBasket:true}
        })
        res.json(sneakers)
    }catch(e){
        res.status(500).json({e:"failed to load basketsneakers"})
    }
}
export const getSneakersFavorite = async(req,res)=>{
    try{
        const sneakers = await prisma.sneakers.findMany({
            where:{isFavorite:true}
        });
        res.json(sneakers)
    }catch(e){
        res.status(500).json({e:"failed to load favoritesneakers"})
    }
}

export const addRemoveToBasket =async (req,res)=>{
    const {id}=req.params;
    try{
        const sneaker = await prisma.sneakers.findUnique({where:{id}});
        if(!sneaker){
            return res.status(404).json({error:"Sneaker not found"});
        }
        const updateSneaker = await prisma.sneakers.update({
            where:{id},
            data:{isBasket:!sneaker.isBasket}
        });
        res.json(updateSneaker);
    }catch(e){
        res.status(500).json({e:"Failed to add/remove to basket"})
    }
};

export const addRemoveToFavorite = async(req,res)=>{
    const {id}=req.params;
    try{
        const sneaker = await prisma.sneakers.findUnique({ where: { id } });
        if (!sneaker) {
            return res.status(404).json({ error: 'Sneaker not found' });
        }

        const updatedSneaker = await prisma.sneakers.update({
            where: { id },
            data: { isFavorite: !sneaker.isFavorite }
        });
        res.json(updatedSneaker);
    }catch(e){
        res.status(500).json({e:"Failed to add/remove to favorite"})
    }
}
export const checkout = async(req,res)=>{
    try{
        await prisma.sneakers.updateMany({
            where:{isBasket:true},
            data:{isBasket:false}
        });
        res.json({message:"Checout successful"})
    }catch(e){
        res.status(500).json({e:"Failed to checkout"})
    }
}