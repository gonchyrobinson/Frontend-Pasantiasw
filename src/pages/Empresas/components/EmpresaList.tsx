import React from 'react';
import { Empresa } from '../types/empresa';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
} from '@mui/material';

interface EmpresaListProps {
  empresas: Empresa[];
  onEdit: (empresa: Empresa) => void;
  onDelete: (empresa: Empresa) => void;
}

const EmpresaList: React.FC<EmpresaListProps> = ({
  empresas,
  onEdit,
  onDelete,
}) => {
  return (
    <Grid container spacing={2}>
      {empresas.map(empresa => (
        <Grid item xs={12} md={6} lg={4} key={empresa.idEmpresa}>
          <Card>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                {empresa.nombre}
              </Typography>
              <Typography variant='body2'>
                Vigencia: {empresa.vigencia}
              </Typography>
              <Typography variant='body2'>
                Contrato: {empresa.tipoContrato}
              </Typography>
              <Typography variant='body2'>
                Encargado: {empresa.encargado}
              </Typography>
              <Typography variant='body2'>
                Celular: {empresa.celular}
              </Typography>
              <Typography variant='body2'>
                Correo: {empresa.correoElectronico}
              </Typography>
              <Typography variant='body2'>
                Inicio: {empresa.fechaInicio}
              </Typography>
              <Typography variant='body2'>Fin: {empresa.fechaFin}</Typography>
              <Typography variant='body2'>Sudocu: {empresa.sudocu}</Typography>
            </CardContent>
            <CardActions>
              <Button size='small' onClick={() => onEdit(empresa)}>
                Editar
              </Button>
              <Button
                size='small'
                color='error'
                onClick={() => {
                  if (
                    window.confirm(
                      `¿Seguro que deseas eliminar la empresa "${empresa.nombre}"?`
                    )
                  ) {
                    onDelete(empresa);
                  }
                }}
              >
                Eliminar
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default EmpresaList;
