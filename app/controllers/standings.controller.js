import LeagueStanding from "../models/standings.model.js";

class StandingsController {
  // Create a new league standing
  async createStanding(req, res) {
    try {
      const leagueStanding = new LeagueStanding(req.body);
      await leagueStanding.save();
      res.status(201).send(leagueStanding);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  // Read all league standings
  async getStandings(req, res) {
    try {
      const standings = await LeagueStanding.find().populate("team");
      res.status(200).send(standings);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  // Read a single league standing by ID
  async getStandingById(req, res) {
    try {
      const standing = await LeagueStanding.findById(req.params.id).populate(
        "team"
      );
      if (!standing) {
        return res.status(404).send();
      }
      res.status(200).send(standing);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  // Read a single league standing by slug
  async getStandingBySlug(req, res) {
    try {
      const standing = await LeagueStanding.findOne({
        "team.slug": req.params.slug,
      }).populate("team");

      if (!standing) {
        return res.status(404).send();
      }
      res.status(200).send(standing);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  // Update a league standing by ID
  async updateStanding(req, res) {
    try {
      const standing = await LeagueStanding.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!standing) {
        return res.status(404).send();
      }
      res.status(200).send(standing);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  // Update a league standing by slug
  async updateStandingBySlug(req, res) {
    try {
      const standing = await LeagueStanding.findOneAndUpdate(
        { "team.slug": req.params.slug },
        req.body,
        { new: true, runValidators: true }
      ).populate("team");

      if (!standing) {
        return res.status(404).send();
      }
      res.status(200).send(standing);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  // Delete a league standing by ID
  async deleteStanding(req, res) {
    try {
      const standing = await LeagueStanding.findByIdAndDelete(req.params.id);
      if (!standing) {
        return res.status(404).send();
      }
      res.status(200).send(standing);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  // Delete a league standing by slug
  async deleteStandingBySlug(req, res) {
    try {
      const standing = await LeagueStanding.findOneAndDelete({
        "team.slug": req.params.slug,
      });

      if (!standing) {
        return res.status(404).send();
      }
      res.status(200).send(standing);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

export default new StandingsController();
