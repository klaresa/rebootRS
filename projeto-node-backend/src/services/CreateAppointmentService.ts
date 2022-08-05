import Appointment from '../models/Appointment'
import { startOfHour } from "date-fns";
import { getCustomRepository } from "typeorm";

import AppError from '../errors/AppError';
import AppointmentsRepository from "../repositories/AppointmentsRepository";

interface RequestDTO {
	provider_id: string;
	date: Date
}

class CreateAppointmentService {
	public async execute({ date, provider_id } : RequestDTO) : Promise<Appointment> {

		const appointmentsRepository = getCustomRepository(AppointmentsRepository);

		const appointmentDate = startOfHour(date);

		const findAppointmentAtSameDate = await appointmentsRepository.findByDate(appointmentDate);

		if (findAppointmentAtSameDate) {
			throw new AppError('this hour has been taken');
		}

		const appointment = appointmentsRepository.create({
			provider_id,
			date: appointmentDate
		});

		await appointmentsRepository.save(appointment);

		return appointment;
	}
}

export default CreateAppointmentService;
