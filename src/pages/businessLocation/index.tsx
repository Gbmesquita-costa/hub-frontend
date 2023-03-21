import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { parseCookies } from 'nookies';

import { motion } from "framer-motion"
import { Button } from '@mui/material';

import { UseContext } from '../../context/context';
import { api } from '../../services/axios';

import Pencil from "../../assets/dashboard/business/pencil.png"
import Trash from "../../assets/dashboard/business/trash.png"

import styles from "./styles.module.scss"

interface BusinessLocation {
  id?: string;
  name: string;
  cep: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  businessId?: string;
}

interface BusinessLocationWithProps {
  id: string;
  name: string;
  website: string;
  LocalBusiness: [];
  cnpj: string;
}

export function BusinessLocationPainel(): JSX.Element {
  const { setLocationActive } = UseContext()

  const [businessLocation, setBusinessLocation] = useState<BusinessLocation[]>([])
  const [businessId, setBusinessId] = useState<string>("")

  const navigate = useNavigate()

  useEffect(() => {
    const { "user_token": token } = parseCookies()

    if (token) {
      setLocationActive(true)
    }

    async function fetchData() {
      const { data } = await api<BusinessLocationWithProps[]>({
        withCredentials: true,
        method: "get",
        url: "/businessReturned"
      })

      data.map(({ LocalBusiness, id }) => {
        setBusinessLocation(LocalBusiness)
        setBusinessId(id)
      })
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
        <Button 
          variant='contained' 
          onClick={() => navigate(`/dashboard/location/create/${businessId}`)}
        >
          Adicionar Local
        </Button>
      </div>

      <div className={styles.mainContainer}>
        <table>
          <thead>
            <tr>
              <th />
              <th>Local</th>
              <th />
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {
              businessLocation?.map((location) => (
                <tr key={location.id}>
                  <td />
                  <td>
                    <span>{location.name}</span>
                  </td>
                  <td />
                  <td>
                    <div>
                      <button onClick={() => { 
                        navigate(`/dashboard/location/update/${location.id}`) 
                      }}>
                        <img src={Pencil} alt="pencil_png" />
                      </button>
                      <button onClick={() => 
                        navigate(`/dashboard/location/delete/${location.id}`)
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