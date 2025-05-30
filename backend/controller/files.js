const Notes = require("../models/Notes")

exports.addNotes = async(req,res)=>{
    try {
        const studentId = req.user.data.user_id;
        if(!studentId){
            console.log("unable to get student id")
            return res.status(404).json({
                success:false,
                error:'unable to get student'
            })
        }
        await Notes.create({
            ...req.body,
            studentId
        });
        return res.status(200).json({
            success: true,
            message: 'notes added successfully'
        });
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success:false,
            error:'internal server error'
        })
    }
}

exports.getAllNotes = async (req, res) => {
    const {category} = req.query;
    if(!category){
        console.log("category not found")
        return res.status(404).json({
            success:false,
            error:"category not found"
        })
    }
    try {
        const notes = await Notes.find({category}); 
        return res.status(200).json({
            success: true,
            data: notes,
        });
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success: false,
            error: 'Internal server error',
        });
    }
};