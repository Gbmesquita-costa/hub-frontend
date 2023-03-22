import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

export function BusinessLocationPainel(): JSX.Element {
  const {setLocationActive, setBusinessId} = UseContext()
  const [businessLocation, setBusinessLocation] = useState<BusinessLocation[]>([])

  const navigate = useNavigate()
  const { id } = useParams()

  setBusinessId(id)

  useEffect(() => {
    const { "user_token": token } = parseCookies()

    if (token) {
      setLocationActive(true)
    }

    async function fetchData() {
      const { data } = await api<BusinessLocation[]>({
        method: "get",
        url: `/locationReturned/${id}`
      })

      setBusinessLocation(data)
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
          onClick={() => navigate(`/dashboard/location/create/${id}`)}
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