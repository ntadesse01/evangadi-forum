const { v4: uuidv4 } = require('uuid');
const { questionById, getAllQuestions, addQuestion } = require('./question.service');

module.exports = {
    createQuestion: (req, res) => {
     //   console.log(req.body);
        //id is user id
        const { question, user_id } = req.body;
        req.body.postId = uuidv4();
        // console.log({ question, user_id });

        //validation
        if (!question || !user_id) {
            return res.status(400).json({ msg: 'Not all fields have been provided!' })
        }

        //sending data to question table
        addQuestion(req.body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ msg: "database connection err" })
            }
            return res.status(200).json({
                msg: "New question was created successfully",
                data: results
            })
        })
    },
    getQuestions: (req, res) => {
        getAllQuestions((err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ msg: "database connection error" })
            }
            return res.status(200).json({ data: results });
        })
    },
    getQuestionById: (req, res) => {
        //id is postId
        let id = req.params.id;
        // console.log(req.body);
   
        questionById(id, (err, results) => {
            if (err) {
                console.log(err);
                return res
                    .status(500)
                    .json({ msg: "database connection error" })
            }
            if (!results) {
                return res.status(400).json({ msg: "Record not found" });
            }
            return res.status(200).json({ data: results });
        })
    }
}