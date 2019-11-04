import User from "../models/User";
import Notification from "../schemas/Notification";

class NotificationController {
  async index(req, res) {
    /**
     * Chek if provider_id is a provider
     */
    const checkIsProvider = await User.findOne({
      where: { id: req.userId, provider: true }
    });

    if (!checkIsProvider) {
      return res
        .status(401)
        .json({ error: "Only providers can load notifications" });
    }

    const notifications = await Notification.find({
      user: req.userId
    })
      .sort({ createdAt: "desc" })
      .limit(20);

    return res.json(notifications);

    // continuar do Listando notificações do usuário, ta com erro, continua no -1,49
  }
}

export default new NotificationController();
