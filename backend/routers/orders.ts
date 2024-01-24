import express from 'express';
import mongoose from 'mongoose';
import auth, { RequestWithUser } from '../middleware/auth';
import Order from '../models/Order';
import { calculateTotalPrice } from './baskets';
import axios from 'axios';

const ordersRouter = express.Router();

ordersRouter.post('/', async (req, res, next) => {
  try {
    const order = new Order({
      // admin_id: ObjectId | undefined;
      createdAt: new Date().toISOString(),
      // status: string;
      // totalPrice: number;
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      email: req.body.email,
      paymentMethod: req.body.paymentMethod,
      deliveryMethod: req.body.deliveryMethod,
      orderComments: req.body.orderComments,
      products: req.body.products,
    });

    order.totalPrice = await calculateTotalPrice(order.products);
    await order.save();

    const message = `Новый заказ №: ${order.orderArt.toUpperCase()} Ожидает обработки!`;
    await sendMessageToTelegram(message);

    return res.send({
      message: {
        en: 'Order created successfully',
        ru: 'Заказ успешно создан',
      },
    });
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    return next(e);
  }
});

ordersRouter.post('/user', auth, async (req, res, next) => {
  const user = (req as RequestWithUser).user;

  try {
    if (user) {
      const order = new Order({
        user_id: user._id,
        createdAt: new Date().toISOString(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        email: req.body.email,
        paymentMethod: req.body.paymentMethod,
        deliveryMethod: req.body.deliveryMethod,
        orderComments: req.body.orderComments,
        products: req.body.products,
      });

      order.totalPrice = await calculateTotalPrice(order.products);
      await order.save();

      const message = `Новый заказ №: ${order.orderArt.toUpperCase()} Ожидает обработки!`;
      await sendMessageToTelegram(message);

      return res.send({
        message: {
          en: 'Order created successfully',
          ru: 'Заказ успешно создан',
        },
      });
    } else {
      return res.send({ message: 'User & sessionKey not found' });
    }
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    return next(e);
  }
});

// ordersRouter.get('/', auth, async (req, res, next) => {
//   const user = (req as RequestWithUser).user;
//   try {
//     if (user.role === 'admin') {
//       if (req.query.admin) {
//         const adminOrders = await Order.find({ adminId: req.query.admin })
//           .populate('userId', '-token')
//           .populate('adminId', '-token')
//           .populate({ path: 'apartmentId', populate: [{ path: 'hotelId' }, { path: 'roomTypeId' }] });
//         return res.send(adminOrders);
//       } else {
//         const openOrders = await Order.find({ status: 'open', adminId: null })
//           .populate('userId', '-token')
//           .populate('adminId', '-token')
//           .populate({ path: 'apartmentId', populate: [{ path: 'hotelId' }, { path: 'roomTypeId' }] });
//         return res.send(openOrders);
//       }
//     }
//     if (user.role === 'director') {
//       if (req.query.admin) {
//         const adminClosedOrders = await Order.find({ adminId: req.query.admin, status: 'closed' })
//           .populate('userId', '-token')
//           .populate('adminId', '-token')
//           .populate({ path: 'apartmentId', populate: [{ path: 'hotelId' }, { path: 'roomTypeId' }] });
//         return res.send(adminClosedOrders);
//       } else {
//         const closedOrders = await Order.find({ status: 'closed' })
//           .populate('userId', '-token')
//           .populate('adminId', '-token')
//           .populate({ path: 'apartmentId', populate: [{ path: 'hotelId' }, { path: 'roomTypeId' }] });
//         return res.send(closedOrders);
//       }
//     }
//     if (user.role === 'user') {
//       const yourOrders = await Order.find({ userId: user.id })
//         .populate('userId', '-token')
//         .populate('adminId', '-token')
//         .populate({ path: 'apartmentId', populate: [{ path: 'hotelId' }, { path: 'roomTypeId' }] });
//       return res.send(yourOrders);
//     }
//     if (user.role === 'hotel') {
//       const hotels = await Hotel.find({ userId: user._id });
//       const hotelsId = await hotels.map((hotel) => hotel._id);
//       const apartments = await Apartment.find({ hotelId: { $in: hotelsId } });
//       const apartmentIds = apartments.map((apartment) => apartment._id);
//       const reservedRooms = await Order.find({ apartmentId: { $in: apartmentIds }, status: 'closed' })
//         .populate('userId', '-token')
//         .populate('adminId', '-token')
//         .populate({ path: 'apartmentId', populate: [{ path: 'hotelId' }, { path: 'roomTypeId' }] });
//       return res.send(reservedRooms);
//     }
//   } catch (e) {
//     return next(e);
//   }
// });
//
// ordersRouter.patch('/useBonus/:id', auth, async (req, res, next) => {
//   try {
//     const user = (req as RequestWithUser).user;
//     const bonusUse = parseInt(req.body.bonusUse);
//     const order = await Order.findById(req.params.id);
//
//     if (!order) {
//       return res.status(404).send({ message: { en: 'cant find order', ru: 'заказ не найден' } });
//     }
//     if (bonusUse > user.cashback) {
//       return res.status(400).send({ message: { en: 'not enough bonuses', ru: 'не хватает бонусных баллов' } });
//     }
//     if (order.totalPrice.kgs <= bonusUse) {
//       return res.status(400).send({
//         message: {
//           en: 'cant use too much bonuses',
//           ru: 'используете слишком много бонусов',
//         },
//       });
//     }
//
//     await Order.findOneAndUpdate(
//       { _id: req.params.id },
//       {
//         $set: {
//           totalPrice: {
//             kgs: order.totalPrice.kgs - bonusUse,
//             usd: order.totalPrice.usd - bonusUse / 90,
//           },
//         },
//       },
//     );
//
//     await User.findOneAndUpdate({ _id: user._id }, { $set: { cashback: user.cashback - bonusUse } });
//
//     res.send({
//       message: {
//         en: 'Bonus successfully used',
//         ru: 'Бонус успешно использован',
//       },
//     });
//   } catch (e) {
//     return next(e);
//   }
// });
//
// ordersRouter.patch('/:id', auth, permit('admin'), async (req, res, next) => {
//   const user = (req as RequestWithUser).user;
//   try {
//     const updatedFields = { ...req.body };
//     updatedFields.adminId = user._id;
//
//     const order: HydratedDocument<IOrder> | null = await Order.findOneAndUpdate(
//       { _id: req.params.id },
//       { $set: updatedFields },
//       { new: true },
//     );
//
//     if (!order) {
//       return res.status(404).send({ message: { en: 'cant find order', ru: 'заказ не найден' } });
//     }
//
//     if (req.body.status === 'closed') {
//       const orderOwner = await User.findById(order.userId);
//       if (!orderOwner) {
//         return res.status(403).send({
//           message: {
//             en: 'Cant find order owner',
//             ru: 'Владельца заказа нет в системе',
//           },
//         });
//       }
//       if (orderOwner.status === 'vip') {
//         await User.findOneAndUpdate(
//           { _id: orderOwner._id },
//           {
//             $set: {
//               cashback: orderOwner.cashback + (order.totalPrice.kgs / 100) * 5,
//             },
//           },
//           { new: true },
//         );
//       }
//       if (orderOwner.status === 'royal') {
//         await User.findOneAndUpdate(
//           { _id: orderOwner._id },
//           {
//             $set: {
//               cashback: orderOwner.cashback + (order.totalPrice.kgs / 100) * 7,
//             },
//           },
//         );
//       }
//     }
//
//     return res.send({
//       message: {
//         en: 'Order updated successfully',
//         ru: 'Заказ успешно изменен',
//       },
//     });
//   } catch (e) {
//     return next(e);
//   }
// });
//
// ordersRouter.delete('/:id', auth, permit('admin', 'director', 'user'), async (req, res, next) => {
//   const user = (req as RequestWithUser).user;
//   const order = await Order.findById(req.params.id);
//   try {
//     if (order) {
//       if (user.role === 'admin' || user.role === 'director') {
//         await Order.deleteOne({ _id: req.params.id });
//         return res.send({
//           message: {
//             en: 'Order deleted successfully',
//             ru: 'Заказ успешно удалён',
//           },
//         });
//       }
//
//       if (user.role === 'user') {
//         if (order.userId.toString() === user._id.toString()) {
//           await Order.deleteOne({ _id: req.params.id, userId: user._id });
//           return res.send({
//             message: {
//               en: 'Order deleted successfully',
//               ru: 'Заказ успешно удалён',
//             },
//           });
//         } else {
//           return res.send({
//             message: {
//               en: 'no permission for this action',
//               ru: 'нет прав для этого действия',
//             },
//           });
//         }
//       }
//     } else {
//       return res.status(404).send({ message: 'Cant find order' });
//     }
//   } catch (e) {
//     return next(e);
//   }
// });
export default ordersRouter;

const botToken = '6719177853:AAG43TUbzPaH5MtbciFBPse-jhKcvyYw1IQ';
const chatId = '640421282';
let lastRequestTime = 0;
const minInterval = 50000; // 1 минута в миллисекундах

// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const sendMessageToTelegram = async (message: string) => {
  const currentTime = Date.now();

  if (currentTime - lastRequestTime < minInterval) {
    console.log('Слишком частые запросы. Подождите.');
    return;
  }

  try {
    await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      chat_id: chatId,
      text: message,
    });
    console.log('Message sent to Telegram:');
  } catch (error) {
    console.error('Error sending message to Telegram:', error);
  } finally {
    lastRequestTime = currentTime;
  }
};
