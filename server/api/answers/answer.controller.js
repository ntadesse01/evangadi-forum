const { answerQuestion, answerByQuestionId } = require("./answer.service");

module.exports = {
    solveQuestion: (req, res) => {
        console.log(req.body);
        const { answer, user_id, question_id } = req.body;
       console.log({ answer, user_id, question_id } );
        //validation
        if (!answer || !user_id || !question_id) {
            return res.status(400).json({ msg: 'Not all fields have been provided!' })
        }

        //sending data to answer table
        answerQuestion(req.body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ msg: "database connection"})
            }
            return res.status(200).json({
                msg: 'Answer was successfully inserted',
                data: results
            })
        })
    },
    getAnswerByQuestionId: (req, res) => {
        let questionId = req.params.id;
        answerByQuestionId(questionId.substring(1), (err, results) => {
            if (err) {
                console.log(err);
                return res
                    .status(500)
                    .json({ msg: "database connection" })
            }
            console.log(results);
            return res.status(200).json({data: results});
        })



    }
}