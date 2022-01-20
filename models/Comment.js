const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReplySchema = new Schema(
    {
      // set custom id to avoid confusion with parent comment _id
      replyId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
      },  
      replyBody: {
        type: String,
        required: 'Not a valid reply!',
        trim: true
      },
      writtenBy: {
        type: String,
        required: 'You must enter a name!',
        trim: true
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

const CommentSchema = new Schema(
  {
    writtenBy: {
      type: String,
      required: 'You must enter a name!',
      trim: true
    },
    commentBody: {
      type: String,
      required: 'Not a valid comment!',
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    replies: [ReplySchema],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true
    },
    id: false
  }
);

CommentSchema.virtual('replyCount').get(function() {
    return this.replies.length;
  });

const Comment = model('Comment', CommentSchema);

module.exports = Comment;