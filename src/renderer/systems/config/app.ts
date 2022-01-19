import ConfigLoadServiceRegister from "../serviceProviders/registers/ConfigLoadServiceRegister";
import AppServiceRegister from "../serviceProviders/registers/AppServiceRegister";
import ContractActionServiceRegister from "../serviceProviders/registers/ContractActionServiceRegister";
import EmptyTempFileServiceBoot from "../serviceProviders/boots/EmptyTempFileServiceBoot";
import BaseServiceRegister from "../serviceProviders/base/BaseServiceRegister";
import {ClassConstructor} from "class-transformer/types/interfaces";
import BaseServiceBoot from "../serviceProviders/base/BaseServiceBoot";
import {RootDataServiceBoot} from "../serviceProviders/boots/RootDataServiceBoot";
import RootDataServiceRegister from "../serviceProviders/registers/RootDataServiceRegister";
import CommandWorkerServiceRegister from "../serviceProviders/registers/CommandWorkerServiceRegister";
import AppInitializationServiceBoot from "../serviceProviders/boots/AppInitializationServiceBoot";

export const serviceRegisterClasses: ClassConstructor<BaseServiceRegister>[] = [
    //app core
    AppServiceRegister,
    ConfigLoadServiceRegister,

    //app default
    RootDataServiceRegister,
    CommandWorkerServiceRegister,

    //libs


    //contract action
    ContractActionServiceRegister,
];


export const serviceBootClasses: ClassConstructor<BaseServiceBoot>[] = [
    //app default
    AppInitializationServiceBoot,
    RootDataServiceBoot,
    EmptyTempFileServiceBoot,
]