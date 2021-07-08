import structureActionTypes from './structure.type';

export const getStructureData = data => ({
    type: structureActionTypes.GET_STRUCTURE_DATA,
    payload:  data
  });

export const getTypeActeurData = data => ({
  type: structureActionTypes.GET_TYPE_ACTEUR,
  payload:  data
});