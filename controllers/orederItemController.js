import orderItemModel from "../models/orderItemModel.js";

export const createOrederItemController = async (req, res) => {
  try {
    const orderItems = req.body;

    if (!orderItems || !Array.isArray(orderItems)) {
      return res.status(401).send({ message: "Invalid order items data" });
    }

    const insertedItems = await orderItemModel.insertMany(orderItems);

    res.status(201).send({
      success: true,
      message: "New order items created successfully",
      orderItems: insertedItems,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error creating order items",
    });
  }
};

export const getOrderItemsController = async (req, res) => {
  try {
    const orderItems = await orderItemModel
      .find({ buyer: req.user._id })
      .populate("buyer", "name");

    res.status(200).send({
      success: true,
      message: "Order items fetched successfully",
      orderItems: orderItems,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error fetching order items",
    });
  }
};

export const getAllOrderItemsController = async (req, res) => {
  try {
    const orderItems = await orderItemModel.find({}).populate("buyer", "name");

    res.status(200).send({
      success: true,
      message: "Order items fetched successfully",
      orderItems: orderItems,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error fetching order items",
    });
  }
};

//Order Status
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderItemModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating order status",
      error,
    });
  }
};
