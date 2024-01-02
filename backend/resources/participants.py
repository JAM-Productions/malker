from flask import jsonify
from flask_restful import Resource
from models.plan import Plan
from models.user import User
from exceptions.plan_errors import PlanCreationError, PlanNotFoundError, PlanDBAddingError
from exceptions.user_errors import UserCreationError, UserNotFoundError, UserAlreadyAdded
from flask_jwt_extended import jwt_required, get_jwt_identity


class AddPartcipants(Resource):

    @jwt_required()
    def patch(self, plan_id, user_id):
        """
        Add participant with id = user_id to plan with id = plan_id
        /api/plan/<plan_id>/add/<user_id>
        :param plan_id: id of the plan where we want to add a new member
        :param user_id: id of the user which will be added to the plan
        :return: if success, success message.
        """
        try:
            u_admin = User.get_user(get_jwt_identity())
            plan = Plan.get_plan_by_id(plan_id)

            # check if user is plan admin
            if plan.get_plan_admin_id() != u_admin.uuid:
                return {"message": "You are not the admin of this group"}, 403

            # check if user to be added exists
            u_add = User.get_user(user_id)

            # add user to plan
            # checking if user to be added already exists is performed inside the following function
            plan.add_participant(u_add.uuid)

            return jsonify({"message": f"User {u_add.username} ({user_id}) added to plan {plan.name} ({plan.uid})"})

        except (UserNotFoundError, UserCreationError, PlanNotFoundError, PlanCreationError, PlanDBAddingError,
                UserAlreadyAdded) as e:
            return {"message": e.message}, e.status
        except Exception:
            return {"message": 'Could not add the requested member'}, 500


class DeleteParticipants(Resource):
    @jwt_required()
    def patch(self, plan_id, user_id):
        """
        Remove participant with id = user_id in plan with id = plan_id
        /api/plan/<plan_id>/delete/<user_id>
        :param plan_id: id of the plan
        :param user_id: id of the user to be removed
        :return: if success, success message.
        """
        try:
            u_admin = User.get_user(get_jwt_identity())
            plan = Plan.get_plan_by_id(plan_id)

            # check if user is plan admin
            if plan.get_plan_admin_id() != u_admin.uuid:
                return {"message": "You are not the admin of this group"}, 403

            # check if user to be deleted exists
            u_delete = User.get_user(user_id)

            # check if user to be deleted is the admin
            if u_delete.uuid == u_admin.uuid:
                # TODO maybe change this behabviour? allow the admin to quit from his own grup?
                return {"message": "You can not remove yourself from the group"}, 403

            # remove user from plan
            # checking if user to be removed exists is performed inside the following function
            plan.remove_participant(u_delete.uuid)

            return jsonify(
                {"message": f"User {u_delete.username} ({user_id}) removed from plan {plan.name} ({plan.uid})"})

        except (UserNotFoundError, UserCreationError, PlanNotFoundError, PlanCreationError, PlanDBAddingError,
                UserAlreadyAdded) as e:
            return {"message": e.message}, e.status
        except Exception:
            return {"message": 'Could not delete the requested member'}, 500
