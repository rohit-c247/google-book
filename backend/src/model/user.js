import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserModelSchema = new Schema(
  {
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    email: { type: String, required: false, lowercase: true },
    providerId: { type: String, required: true },
    loginType: { type: String, required: true },
    profileImage: { type: String, required: false },
    searchString: [
      new Schema(
        {
          string: {
            type: Schema.Types.ObjectId,
            required: false,
            ref: "search",
          },
          times: { type: Schema.Types.Number, default: 1 },
        },
        {
          timestamps: true,
        }
      ),
    ],
  },
  {
    timestamps: true,
  }
);

UserModelSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

UserModelSchema.pre("update", function () {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

UserModelSchema.pre("findOneAndUpdate", function () {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

export default mongoose.model("user", UserModelSchema);
