import { describe, expect, it } from 'vitest'
import { contacts } from '../config/contacts'
import { getContactLinks } from './contactLinks'

describe('getContactLinks', () => {
  it('keeps missing contacts unavailable rather than creating fake links', () => {
    expect(
      getContactLinks({ ...contacts, phone: null, whatsapp: null, email: null, instagram: null }),
    ).toEqual({
      phone: null,
      email: null,
      whatsapp: null,
      instagram: null,
    })
  })
  it('normalizes an international telephone before creating direct links', () => {
    const result = getContactLinks({
      ...contacts,
      phone: '+44 (7700) 900-123',
      whatsapp: '+44 7700 900123',
    })
    expect(result.phone).toBe('tel:+447700900123')
    expect(result.whatsapp).toBe('https://wa.me/447700900123')
  })
  it('rejects noninternational or malformed phone values', () => {
    expect(
      getContactLinks({ ...contacts, phone: '1234', whatsapp: 'javascript:alert(1)' }),
    ).toMatchObject({ phone: null, whatsapp: null })
  })
  it('allows only secure Instagram profile URLs', () => {
    expect(
      getContactLinks({ ...contacts, instagram: 'https://www.instagram.com/example/' }).instagram,
    ).toBe('https://www.instagram.com/example/')
    for (const instagram of [
      'http://instagram.com/example',
      'https://instagram.com.evil.test/example',
      'javascript:alert(1)',
      'https://instagram.com/',
    ]) {
      expect(getContactLinks({ ...contacts, instagram }).instagram).toBeNull()
    }
  })
  it('does not turn invalid email addresses into working-looking links', () => {
    expect(getContactLinks({ ...contacts, email: 'not an email' }).email).toBeNull()
    expect(getContactLinks({ ...contacts, email: 'office@example.com' }).email).toBe(
      'mailto:office%40example.com',
    )
  })
})
