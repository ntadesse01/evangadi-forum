const {pool} = require('../../db/database');

module.exports = {
    addQuestion: (data, callback) => {
        //console.log(data);
    try {
        pool.query(`INSERT INTO question(question,question_description,question_code_block,tags,post_id,user_id)VALUES(?,?,?,?,?,?)`,
        [
            data.question,
            data.questionDescription,
            data.questionCodeBlock,
            data.tags,
            data.postId,
            data.user_id
        ], (err, result) => {
            if (err) {
                return callback(err);
            }
            return callback(null, result)
        }
    );
        
    } catch (error) {

        console.log(error);
        return null;
    }
    },
    getAllQuestions: (callback) => {
       try {
        pool.query(`SELECT registration.user_name, question,question_description,question_code_block,tags,post_id FROM question JOIN registration ON question.user_id = registration.user_id  ORDER BY question_id DESC`, [], (err, result) => {
            if (err) {
                return callback(err);
            }
            return callback(null, result);
        })
        
       } catch (error) {
        console.log(error);
        return null;
       }
    },
    questionById: (id, callback) => {
        // console.log(id);
        // //id is postId
       try {
        pool.query(`SELECT * FROM question WHERE post_id = ?`, [id], (err, result) => {
            if (err) {
                return callback(err);
            }
          //  console.log(result);
            return callback(null, result[0]);
        })

       } catch (error) {
        console.log(error);
        return null;
       }
    }
}