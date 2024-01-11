const  { pool } = require('../../db/database');

module.exports = {
    answerQuestion: (data, callback) => {
     try{

        pool.query(`INSERT INTO answer(answer,answer_code_block,question_id,user_id)VALUES(?,?,?,?)`,
        [
            data.answer,
            data.answerCodeBlock,
            data.question_id,
            data.user_id
        ], (err, result) => {
            if (err) {
                return callback(err);
            }
            return callback(null, result);
        }
    );

     }catch(e){
        console.log(e);

        return null;
     }



    },
    answerByQuestionId: (id, callback) => {
        //id is questionId
     try {
        pool.query(`SELECT
        answer.answer_id,
        answer.answer,
        answer.user_id,
        registration.user_name
      FROM
        answer
      JOIN
        registration ON answer.user_id = registration.user_id
      JOIN
        question ON answer.question_id = question.question_id
      WHERE
        question.post_id = ?`, [id], (err, result) => {
            if (err) {
                return callback(err);
            }
            return callback(null, result);
        })
        
     } catch (error) {
        console.log(error);
        return null;
     }
    }

    
}