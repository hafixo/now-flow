const Now = require('.')

module.exports = class Teams extends Now {
	async create({ slug }) {
		return this.retry(async (bail, attempt) => {
			if (this._debug) {
				console.time(`> [debug] #${attempt} POST /teams}`)
			}

			const res = await this._fetch('/teams', {
				method: 'POST',
				body: {
					slug
				}
			})

			if (this._debug) {
				console.timeEnd(`> [debug] #${attempt} POST /teams`)
			}

			if (res.status === 403) {
				return bail(new Error('Unauthorized'))
			}

			const body = await res.json()

			if (res.status === 400) {
				const e = new Error(body.error.message)
				e.code = body.error.code
				return bail(e)
			} else if (res.status !== 200) {
				const e = new Error(body.error.message)
				e.code = body.error.code
				throw e
			}

			return body
		})
	}

	async edit({ id, slug, name }) {
		return this.retry(async (bail, attempt) => {
			if (this._debug) {
				console.time(`> [debug] #${attempt} PATCH /teams/${id}}`)
			}

			const payload = {}
			if (name) {
				payload.name = name
			}
			if (slug) {
				payload.slug = slug
			}

			const res = await this._fetch(`/teams/${id}`, {
				method: 'PATCH',
				body: payload
			})

			if (this._debug) {
				console.timeEnd(`> [debug] #${attempt} PATCH /teams/${id}`)
			}

			if (res.status === 403) {
				return bail(new Error('Unauthorized'))
			}

			const body = await res.json()

			if (res.status === 400) {
				const e = new Error(body.error.message)
				e.code = body.error.code
				return bail(e)
			} else if (res.status !== 200) {
				const e = new Error(body.error.message)
				e.code = body.error.code
				throw e
			}

			return body
		})
	}

	async inviteUser({ teamId, email }) {
		return this.retry(async (bail, attempt) => {
			if (this._debug) {
				console.time(`> [debug] #${attempt} POST /teams/${teamId}/members}`)
			}
			const res = await this._fetch(`/teams/${teamId}/members`, {
				method: 'POST',
				body: {
					email
				}
			})

			if (this._debug) {
				console.timeEnd(`> [debug] #${attempt} POST /teams/${teamId}/members}`)
			}

			if (res.status === 403) {
				return bail(new Error('Unauthorized'))
			}

			const body = await res.json()

			if (res.status === 400) {
				const e = new Error(body.error.message)
				e.code = body.error.code
				return bail(e)
			} else if (res.status !== 200) {
				const e = new Error(body.error.message)
				e.code = body.error.code
				throw e
			}

			return body
		})
	}

	async ls() {
		return this.retry(async (bail, attempt) => {
			if (this._debug) {
				console.time(`> [debug] #${attempt} GET /teams}`)
			}

			const res = await this._fetch('/teams')

			if (this._debug) {
				console.timeEnd(`> [debug] #${attempt} GET /teams`)
			}

			if (res.status === 403) {
				return bail(new Error('Unauthorized'))
			}

			return res.json()
		})
	}
}
