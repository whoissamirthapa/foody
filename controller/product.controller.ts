import { Request, Response } from "express";
import { unlinkAsync } from "../middleware/imageupload.js";
import Product from "../model/product.model.js";

export default class ProductController {
    createProduct = async (req: Request, res: Response) => {
        const fileurl = req.file?.path;
        const imgUrl = fileurl?.slice(6, fileurl.length);

        const {
            name,
            price,
            description,
            category,
            subCategory,
            brand,
            countInStock,
        } = req.body;
        try {
            if (
                name.trim() === "" ||
                price === null ||
                description.trim() === "" ||
                category.trim() === ""
            ) {
                return res.status(400).json({
                    error: "Please enter all fields",
                });
            }
            const existProduct = await Product.findOne({ name });
            if (existProduct) {
                return res.status(400).json({
                    error: "Product already exists",
                });
            }
            const product = await new Product({
                name,
                price,
                description,
                image: imgUrl,
                category,
                subCategory,
                brand,
                countInStock: countInStock ? countInStock : 0,
                rating: 0,
                numReviews: 0,
                reviews: [],
            }).save();

            if (product) {
                res.status(201).json({
                    message: "Product created successfully",
                    data: product,
                });
            } else {
                res.status(400).json({
                    error: "Product creation failed",
                });
            }
        } catch (error) {
            console.log("error occured while creating product " + error);
        }
    };

    getProducts = async (req: Request, res: Response) => {
        try {
            const products = await Product.find();
            if (products) {
                res.status(200).json({
                    message: "Products are found successfully",
                    data: products,
                });
                return;
            }
            res.status(404).json({ error: "Products are not found" });
        } catch (error) {
            console.log("error in getting products" + error);
        }
    };

    getProduct = async (req: Request, res: Response) => {
        const { productId } = req.params;
        try {
            const product = await Product.findOne({ _id: productId });
            if (product) {
                res.status(200).json({
                    message: "Product is found successfully",
                    data: product,
                });
                return;
            }
            res.status(404).json({ error: "Product is not found" });
        } catch (error) {
            console.log("error in getting product" + error);
        }
    };

    getProductsByCategory = async (req: Request, res: Response) => {
        const { category } = req.params;
        if (!category) {
            return res.status(400).json({
                error: "Please enter category",
            });
        }
        try {
            const products = await Product.find({ category });
            if (products) {
                res.status(200).json({
                    message: "Products are found successfully",
                    data: products,
                });
                return;
            }
            res.status(404).json({ error: "Products are not found" });
        } catch (error) {
            console.log("error in getting products" + error);
        }
    };

    updateProduct = async (req: Request, res: Response) => {
        const { productId } = req.params;
        let fileurl;
        if (req.file) {
            fileurl = req.file?.path.slice(6, req.file.path.length);
        }
        const {
            name,
            price,
            description,
            category,
            productImage,
            subCategory,
            brand,
            countInStock,
        } = req.body;

        const product = await Product.findOne({ _id: productId });

        if (!product) {
            return res.status(404).json({
                error: "Product not found",
            });
        }

        if (fileurl) {
            fileurl = fileurl;
            const oldImage = `public${product.image}`;
            await unlinkAsync(oldImage);
        } else {
            fileurl = productImage;
        }

        try {
            if (
                name === "" ||
                price === null ||
                description === "" ||
                category === ""
            ) {
                return res.status(400).json({
                    error: "Please enter required fields",
                });
            }
            const updatedProduct = await Product.findOneAndUpdate(
                { _id: productId },
                {
                    name,
                    price,
                    description,
                    category,
                    image: fileurl,
                    subCategory,
                    brand,
                    countInStock: countInStock
                        ? countInStock
                        : product.countInStock,
                },
                { new: true }
            );
            if (updatedProduct) {
                res.status(200).json({
                    message: "Product is updated successfully",
                    data: updatedProduct,
                });
                return;
            }
            res.status(404).json({ error: "Product is not updated" });
        } catch (error) {
            console.log("error in updating product" + error);
        }
    };

    addReview = async (req: Request, res: Response) => {
        const productId = req.params.productId;
        const { rating, comment } = req.body;

        if (!rating) {
            return res.status(400).json({
                error: "Please enter rating",
            });
        }

        const product = await Product.findOne({ _id: productId });
        if (!product) {
            return res.status(404).json({
                error: "Product not found",
            });
        }

        if (
            product.reviews.find((review) => review?.reviewerId === req.user.id)
        ) {
            return res.status(400).json({
                error: "You have already reviewed this product",
            });
        }

        const review = {
            reviewerId: req.user.id,
            name: req.user.name,
            rating,
            comment,
        };
        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating =
            product.reviews.reduce((x, y) => x + y.rating, 0) /
            product.reviews.length;

        const ratedProduct = await product.save();
        if (ratedProduct) {
            return res.status(200).json({
                message: "Review created successfully",
                data: ratedProduct.reviews,
            });
        }
        res.status(400).json({
            error: "Review creation failed",
        });
    };

    deleteProduct = async (req: Request, res: Response) => {
        const { productId } = req.params;
        try {
            const deletedProduct = await Product.findOneAndRemove({
                _id: productId,
            });
            if (deletedProduct) {
                if (deletedProduct.image) {
                    const deleteImgUrl = `public${deletedProduct.image}`;
                    await unlinkAsync(deleteImgUrl);
                }
                res.status(200).json({
                    message: "Product is deleted successfully",
                    data: deletedProduct,
                });
                return;
            }
            res.status(404).json({ error: "Product is not deleted" });
        } catch (error) {
            console.log("error in deleting product" + error);
        }
    };
}
