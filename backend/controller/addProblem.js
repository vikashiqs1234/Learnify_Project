const Problem = require("../models/Problems");

exports.addProblem = async(req,res)=>{
  try {
      const {name,problem} = req.body;
      if(!name || !problem){
          return res.status(404).json({
              success:false,
              error:'provide all the details'
          })
      }
      await Problem.create({
          problem,
          name
      })
      return res.status(200).json({
        success:true,
        message:"problem added successfully"
      })
  } catch (error) {
    return res.status(500).json({
        success:false,
        error:'Internal Server Error'
    })
  }
}
exports.addAnswer = async (req, res) => {
    try {
      const { problemId, name, answer } = req.body;
  
      // Validate input
      if (!problemId || !name || !answer) {
        return res.status(400).json({
          success: false,
          error: 'Provide all the details'
        });
      }
  
      // Find the problem by ID and update it with the new answer
      const updatedProblem = await Problem.findByIdAndUpdate(
        problemId,
        {
          $push: {
            answers: {
              answer,
              name
            }
          }
        },
        { new: true } // Return the updated document
      );
  
      if (!updatedProblem) {
        return res.status(404).json({
          success: false,
          error: 'Problem not found'
        });
      }
  
      return res.status(200).json({
        success: true,
        message: 'Answer added successfully',
        data: updatedProblem
      });
    } catch (error) {
      console.error('Error adding answer:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal Server Error'
      });
    }
  };

  exports.getAllProblems = async (req, res) => {
    try {
      // Retrieve all problems from the database
      const problems = await Problem.find({});
  
      // Check if there are any problems
      if (problems.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'No problems found'
        });
      }
  
      return res.status(200).json({
        success: true,
        data: problems
      });
    } catch (error) {
      console.error('Error retrieving problems:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal Server Error'
      });
    }
  };
  
  