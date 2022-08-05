import Appointment from '../models/Appointment';
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {

	// toda vez que tem um async o retorno eh sempre uma promise
	public async findByDate(date: Date): Promise<Appointment | null> {

		const findAppointment = await this.findOne({
			where: { date }
		});

		return findAppointment || null;
	}

	// const findAppointment = this.appointments.find(appointment =>
	// 	isEqual(date, appointment.date),
	// );
}
export default AppointmentsRepository;
