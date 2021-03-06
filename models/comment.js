const { Schema, model, Types } = require('mongoose'); 
const dateFormat = require('../utils/dateFormat');

const ReplySchema = new Schema(
    {
        replyId:{
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        replyBody: {
            type: String
        },
        writtenBy: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

const CommentSchema = new Schema(
    {
        // set custom id to avoid confusion with parent comment _id
        replyId: {
          type: Schema.Types.ObjectId,
          default: () => new Types.ObjectId()
        },
        replyBody: {
          type: String,
          required: true
        },
        writtenBy: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
          get: createdAtVal => dateFormat(createdAtVal)
        }
      },
      {
        toJSON: {
          getters: true
        }
      }
);
CommentSchema.virtual('replyCount').get(function() {
    return this.replies.length;
  });

const Comment = model('Comment', CommentSchema);
module.exports = Comment;