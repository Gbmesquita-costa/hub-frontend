import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@mui/material';
import { motion } from "framer-motion"

import { api } from '../../services/axios';

import Pencil from "../../assets/dashboard/business/pencil.png"
import Location from "../../assets/dashboard/business/business.png"
import Trash from "../../assets/dashboard/business/trash.png"

import styles from "./styles.module.scss"

interface BusinessWithProps {
  id: string;
  name: string;
  website: string;
  LocalBusiness: [];
  cnpj: string;
}

export function Business(): JSX.Element {
  const [business, setBusiness] = useState<BusinessWithProps[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchData() {
      const { data } = await api<BusinessWithProps[]>({ method: "get", url: "/businessReturned" })
      setBusiness(data)
    }

    fetchData()
  }, [])

  return (
    <motion.div
      initial={{
        y: 200,
        opacity: 0
      }}
      animate={{
        y: 0,
        opacity: 1
      }}
      transition={{
        duration: 1.0
      }}
      className={styles.main}
    >
      <div className={styles.addBusiness}>
        <Button variant='contained' onClick={() => navigate("/dashboard/create")}>
          Adicionar Empresa
        </Button>
      </div>

      <div className={styles.mainContainer}>
        <table>
          <thead>
            <tr>
              <th />
              <th>Empresa</th>
              <th />

              <th>QT de Locais</th>

              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {
              business?.map((business) => (
                <tr key={business.id}>
                  <td />
                  <td>
                    <span>{business.name}</span>
                  </td>
                  <td />
                  <td>
                    <span>{business.LocalBusiness.length}</span>
                  </td>
                  <td>
                    <div>
                      <button onClick={() =>
                        navigate(`/dashboard/update/${business.id}`)
                      }>
                        <img src={Pencil} alt="pencil_png" />
                      </button>
                      <button onClick={() =>
                        navigate(`/dashboard/location`)
                      }>
                        <img src={Location} alt="business_location" />
                      </button>
                      <button onClick={() =>
                        navigate(`/dashboard/delete/${business.id}`)
                      }>
                        <img src={Trash} alt="pencil_png" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>

        <div className={styles.container} />

        <footer>
          <div className={styles.pages}>
            <div className={styles.currentPage}>
              Página: 1
            </div>

            <div className={styles.qtPages}>
              Qt por página: 10
            </div>

            <div className={styles.buttons}>
              <Button disabled variant='contained'>
                Anterior
              </Button>
              <Button variant='contained'>
                Próximo
              </Button>
            </div>
          </div>
        </footer>
      </div>

    </motion.div>
  )
}