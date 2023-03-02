import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Home } from "../model/home";

class HomeService {
  private homeRepository;

  constructor() {
    this.homeRepository = AppDataSource.getRepository(Home);
  }

  getAll = async () => {
    let sql = `select * from home h join category c on h.idCategory = c.idCategory`;
    let homes = await this.homeRepository.query(sql);
    if (!homes) {
      return "No homes found";
    }
    return homes;
  };

  getAllHome = async (limit, offset) => {
    let sql = `select * from home h join user u on h.idUser = u.idUser join category c on h.idCategory = c.idCategory LIMIT ${limit} OFFSET ${offset}`;
    let homes = await this.homeRepository.query(sql);
    if (!homes) {
      return "No homes found";
    }
    return homes;
  };

  getMyHome = async (idUser) => {
    let sql = `select * from home h join category c on h.idCategory = c.idCategory join user u on h.idUser = u.idUser where u.idUser = ${idUser}`;
    let homes = await this.homeRepository.query(sql);
    return homes;
  };

  save = async (home) => {
    return this.homeRepository.save(home);
  };
  findById = async (idHome) => {
    let homes = await this.homeRepository.findOneBy({ idHome: idHome });
    return homes;
  };
  updateHome = async (idHome, newHome) => {
    let homes = await this.homeRepository.findOneBy({ idHome: idHome });
    if (!homes) {
      return null;
    }
    newHome.count = homes.count;
    return this.homeRepository.update({ idHome: idHome }, newHome);
  };
  deleteHome = async (idHome) => {
    let homes = await this.homeRepository.findOneBy({ idHome: idHome });
    if (!homes) {
      return null;
    }
    return this.homeRepository.delete({ idHome: idHome });
  };
  findHomeByAddress = async (value, limit, offset) => {
    let sql = `select * from home h join category c on h.idCategory = c.idCategory where h.address like '%${value}%' LIMIT ${limit} OFFSET ${offset}`;
    let homes = await this.homeRepository.query(sql);
    sql = `select count(*) c from home h join category c on h.idCategory = c.idCategory where h.address like '%${value}%'`;
    let counts = await this.homeRepository.query(sql);
    let totalPage = Math.ceil(+counts[0].c / limit)
    if (!homes) {
      return null;
    }
    return {homes: homes, totalPage: totalPage};
  };

  checkUser = async (idUser, idHome) => {
    let checkIdUser = await this.homeRepository.findOneBy({ idHome: idHome });
    if (checkIdUser.idUser === idUser) {
      return true;
    }
    return false;
  };
  checkCount = async (idHome) => {
    let homes = await this.homeRepository.findOneBy({ idHome: idHome });
    if (!homes) {
      return null;
    }
    homes.count++;
    return await this.homeRepository.update({ idHome: idHome }, homes);
  };

  top4Home = async () => {
    let sql = `select * from home h join category c on h.idCategory = c.idCategory join image i on h.idHome = i.idHome order by count desc limit 4`;
    let homes = await this.homeRepository.query(sql);
    if (!homes) {
      return null;
    }
    return homes;
  };

  countHomes = async (limit) => {
    let sql = `select COUNT(idHome) c from home`;
    let homes = await this.homeRepository.query(sql);
    let totalPage = Math.ceil(+homes[0].c / limit);
    return totalPage;
  };
  changeStatusHome = async (idHome)=> {
    let home = await this.homeRepository.findOneBy({ idHome: idHome });
    if (!home) {
      return null
    }
    if (home.status === 'Rented'){
      home.status = 'For rent';
    } else {
      home.status = 'Rented'
    }
    return await this.homeRepository.update({idHome: idHome}, home)
  }
}

export default new HomeService();
