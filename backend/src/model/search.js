import mongoose from "mongoose";

const { Schema } = mongoose;

const SearchModelSchema = new Schema(
    {
        string: { type: Schema.Types.String, required: true },
    },
    {
        timestamps: true,
    }
);

SearchModelSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

SearchModelSchema.pre("update", function () {
    this.update({}, { $set: { updatedAt: Date.now() } });
});

SearchModelSchema.pre("findOneAndUpdate", function () {
    this.update({}, { $set: { updatedAt: Date.now() } });
});

SearchModelSchema.path('string').get(function (string) {
    return string.trim();
});

SearchModelSchema.path('string').set(function (string) {
    return string.trim();
});
export default mongoose.model("search", SearchModelSchema);
