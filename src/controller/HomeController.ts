import categoryService from "../service/CategoryService";
import { Request, Response } from "express";
import homeService from "../service/HomeService";
import orderService from "../service/OrderService";
import imageService from "../service/ImageService";

class homeController {
  private homeService;
  private categoryService;
  private orderService;
  private imageService;

  constructor() {
    this.homeService = homeService;
    this.categoryService = categoryService;
    this.orderService = orderService;
    this.imageService = imageService;
  }

  getAllHome = async (req: Request, res: Response) => {
    try {
      let orders;
      let data;
      let homes = await homeService.getAll();
      let categories = await categoryService.getAllCategory();
      if (req["decoded"]) {
        // orders = await orderService.getMyOrder(req["decoded"].idUser);
        data = [homes, categories, orders];
      } else {
        data = [homes, categories];
      }
      res.status(200).json(homes);
    } catch (e) {
      res.status(500).json(e.message);
    }
  };

  getImages = async (req: Request, res: Response) => {
    try {
      let orders;
      let data;
      let images = await imageService.getAllImage();
      let categories = await categoryService.getAllCategory();
      if (req["decoded"]) {
        // orders = await orderService.getMyOrder(req["decoded"].idUser);
        // data = [homes, categories, orders];
      } else {
        // data = [homes, categories];
      }
      res.status(200).json(images);
    } catch (e) {
      res.status(500).json(e.message);
    }
  };

  getImagesByIdHome = async (req: Request, res: Response) => {
    try {
      let orders;
      let data;
      let images = await imageService.findImageByIdHome(req.params.idHome);
      let categories = await categoryService.getAllCategory();
      if (req["decoded"]) {
        // orders = await orderService.getMyOrder(req["decoded"].idUser);
        // data = [homes, categories, orders];
      } else {
        // data = [homes, categories];
      }
      res.status(200).json(images);
    } catch (e) {
      res.status(500).json(e.message);
    }
  };

  index = async (req: Request, res: Response) => {
    let limit = 6;
    let offset = 0;
    let page = 1;
    if (req.query.page) {
      page = +req.query.page;
      offset = (+page - 1) * limit;
    }
    let homes = await homeService.getAllHome(limit, offset);
    let totalPage = await homeService.countHomes(limit);
    return res.status(201).json({
      homes: homes,
      currentPage: page,
      totalPage: totalPage,
    });
  };

  getMyHome = async (req: Request, res: Response) => {
    try {
      let homes = await homeService.getMyHome(req["decoded"].idUser);
      let categories = await categoryService.getAllCategory();
      // let playlists = await homeService.getMyPlaylist(req["decoded"].idUser);
      let data = [homes, categories];
      res.status(200).json(data);
    } catch (e) {
      res.status(500).json(e.message);
    }
  };

  createHome = async (req: Request, res: Response) => {
    try {
      let homes = await homeService.save(req.body);
      res.status(200).json(homes);
    } catch (e) {
      res.status(500).json(e.message);
    }
  };

  editHome = async (req: Request, res: Response) => {
    try {
      let idHome = req.params.idHome;
      let idUser = req["decoded"].idUser;
      let check = await this.homeService.checkUser(idUser, idHome);
      console.log(idUser, check);
      if (check) {
        let homes = await this.homeService.updateHome(idHome, req.body);
        res.status(200).json(homes);
      } else {
        res.status(401).json("invalid");
      }
    } catch (e) {
      res.status(500).json(e.message);
    }
  };
  deleteHome = async (req: Request, res: Response) => {
    try {
      let idHome = req.params.idHome;
      let idUser = req["decoded"].idUser;
      let check = await this.homeService.checkUser(idUser, idHome);
      if (check || req["decoded"].role === "admin") {
        let homes = await this.homeService.deleteHome(idHome);
        res.status(200).json(homes);
      } else {
        res.status(401).json("invalid");
      }
    } catch (e) {
      res.status(500).json(e.message);
    }
  };
  findByIdHome = async (req: Request, res: Response) => {
    try {
      let idHome = req.params.idHome;
      let homes = await homeService.findById(idHome);
      res.status(200).json(homes);
    } catch (e) {
      res.status(500).json(e.message);
    }
  };
  findCategory = async (req: Request, res: Response) => {
    try {
      let categories = await categoryService.getAllCategory();
      res.status(200).json(categories);
    } catch (e) {
      res.status(500).json(e.message);
    }
  };
  // searchNamehome = async (req: Request,res: Response) => {
  //     try{
  //         let homes = await this.homeService.findByNamehome(req.query.namehome)
  //         res.status(200).json(homes)
  //     }catch (e){
  //         res.status(500).json(e.message)
  //     }

  // }

  findHomeByIdUser = async (req: Request, res: Response) => {
    try {
      let homes = await this.homeService.findHomeByIdUser(req.params.idUser);
      return res.status(200).json(homes);
    } catch (err) {
      res.status(500).json(err.message);
    }
  };

  countHome = async (req: Request, res: Response) => {
    try {
      let idHome = req.params.idHome;
      let counts = await this.homeService.checkCount(idHome);
      res.status(200).json(counts);
    } catch (err) {
      res.status(500).json(err.message);
    }
  };

  findHomeByAddress = async (req: Request,res: Response) => {
    let address = req.query.address;
    let homes = await homeService.findHomeByAddress(address);
    return res.status(201).json({
      homes: homes
    });
  }

  // findhome = async (req: Request,res: Response) => {
  //     try {
  //         let name = req.query.name
  //         let homes = await this.homeService.findhomeByName(name)
  //         let categories = await categoryService.getAllCategory();
  //         let data = [homes, categories];
  //         res.status(200).json(data)
  //     } catch (err) {
  //         res.status(500).json(err.message)
  //     }
  // }
}

export default new homeController();
