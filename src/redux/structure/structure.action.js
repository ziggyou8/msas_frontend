import structureActionTypes from './structure.type';

export const getStructureData = data => ({
    type: structureActionTypes.GET_STRUCTURE_DATA,
    payload:  data
  });

export const getTypeActeurData = data => ({
  type: structureActionTypes.GET_TYPE_ACTEUR,
  payload:  data
});

export const getCurrentStructure = data => ({
  type: structureActionTypes.GET_CURRENT_STRUCTURE,
  payload:  data
});